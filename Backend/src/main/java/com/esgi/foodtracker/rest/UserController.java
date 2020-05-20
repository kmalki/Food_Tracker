package com.esgi.foodtracker.rest;

import com.esgi.foodtracker.model.UserApp;
import com.esgi.foodtracker.repository.ProductRepository;
import com.esgi.foodtracker.repository.UserRepository;
import com.github.rozidan.springboot.logger.Loggable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {

    final static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private ProductRepository productRepository;

    public UserController(UserRepository userRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Loggable
    @PostMapping("/sign-up")
    public ResponseEntity<String> signUp(@RequestBody UserApp user) {
        if(userRepository.findByUsername(user.getUsername()) != null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    String.format("users %s already exists", user.getUsername()));
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                String.format("user %s signed in", user.getUsername()));
    }

//    @Loggable
//    @GetMapping("/test")
//    public void test() throws IOException {
//        File file = new ClassPathResource("products.bson").getFile();
//        InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
//
//        BSONDecoder decoder = new BasicBSONDecoder();
//        int count = 0;
//        int count2 = 0;
//        try {
//            while (inputStream.available() > 0) {
//
//                BSONObject obj = decoder.readObject(inputStream);
//                if(obj == null){
//                    break;
//                }
//                String code = (String) obj.get("code");
//                if(code.length()!=13){
//                    continue;
//                }
//                count++;
//                if(count<1006100){
//                    continue;
//                }
//                String url = obj.get("image_url") == null ? "" : (String) obj.get("image_url");
//                String product_name = obj.get("product_name") == null ? "" : (String) obj.get("product_name");
//                String category = obj.get("categories") == null ?
//                        "" : ((String) obj.get("categories"));
//                String brand = obj.get("brands") == null ?
//                        "" : ((String) obj.get("brands"));
//                productRepository.save(new ProductDTO(
//                        product_name,
//                        code,
//                        category,
//                        brand,
//                        url));
////                if(count%300==0) {
////                    TimeUnit.SECONDS.sleep(1);
////                    logger.info(String.valueOf(count));
////                }
//            }
//        } catch (IOException  e) {
//            // TODO Auto-generated catch block
//            logger.error(e.getLocalizedMessage());
//        }finally {
//            try {
//                inputStream.close();
//            } catch (IOException e) {
//            }
//        }
//        logger.info("Done");
//    }
}
