package com.esgi.foodtracker.rest;

import com.esgi.foodtracker.model.ProductDTO;
import com.esgi.foodtracker.repository.ProductRepository;
import com.github.rozidan.springboot.logger.Loggable;
import com.google.zxing.*;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.oned.CodaBarReader;
import com.google.zxing.oned.EAN13Reader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Hashtable;
import java.util.List;

@RestController
public class ProductController {

    final static Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/getProduct")
    public List<ProductDTO> getProduct(){
        List<ProductDTO> l = productRepository.findAllByCode(3274080005003L);
        return l;
    }


    @Loggable
    @GetMapping("/getBarCode")
    public String processImage(@RequestParam("file") MultipartFile file){
        BinaryBitmap bitmap = null;
        BufferedImage image;

        try {
            image = ImageIO.read(file.getInputStream());
            int[] pixels = image.getRGB(0, 0, image.getWidth(), image.getHeight(), null, 0, image.getWidth());
            RGBLuminanceSource source = new RGBLuminanceSource(image.getWidth(), image.getHeight(), pixels);
            bitmap = new BinaryBitmap(new HybridBinarizer(source));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        if (bitmap == null)
            return null;

        Reader reader = new EAN13Reader();
        String res = "error";
        Hashtable<DecodeHintType, Boolean> hints = new Hashtable<>();
        hints.put(DecodeHintType.TRY_HARDER, Boolean.TRUE);

        Result result = null;
        try {
            result = reader.decode(bitmap, hints);
            if ((result != null) && (result.getText() != null)) {
                res = result.getText();
            } else {
                res = "no ean found";
            }
        } catch (NotFoundException | ChecksumException | FormatException e) {
            logger.error(e.getMessage());
        }
        logger.info(res);
        return res;
    }
}
