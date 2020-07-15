
terraform {
  required_version = ">= 0.12.0"
  required_providers {
    azurerm = ">=2.0.0"
  }
}

provider "azurerm" {
  version = ">=2.0.0"
  features {}

}

locals {
  group_name = "iabd"
}

resource "azurerm_resource_group" "main" {
  name     = local.group_name
  location = "francecentral"
}

resource "azurerm_mysql_server" "main" {
  name                = "mysql-server-hedikameliles"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  sku_name = "B_Gen5_2"

  storage_profile {
    storage_mb            = 5120
    backup_retention_days = 7
    geo_redundant_backup  = "Disabled"
  }
  

  administrator_login          = "hedi"
  administrator_login_password = "CocaB1Fra!Chakal"
  version                      = "5.7"
  ssl_enforcement              = "Enabled"
}

resource "azurerm_cosmosdb_account" "main" {
  name                = "tfex-cosmosdb-account"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  offer_type          = "Standard"

  capabilities {
    name = "EnableCassandra"
  }

  consistency_policy {
    consistency_level = "Strong"
  }

  geo_location {
    location          = "francecentral"
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_cassandra_keyspace" "main" {
  name                = "projet-annuel-cassandra-keyspaces-IKH"
  resource_group_name = azurerm_resource_group.main.name
  account_name        = azurerm_cosmosdb_account.main.name
  throughput          = 400
}


resource "azurerm_cosmosdb_account" "mango" {
  name                = "tfex-cosmosdb2-account"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  offer_type          = "Standard"
  kind                = "MongoDB"

  capabilities {
    name = "MongoDBv3.4"
  }
  
  consistency_policy {
    consistency_level = "Strong"
  }

  geo_location {
    location          = "francecentral"
    failover_priority = 0
  }
}


resource "azurerm_cosmosdb_mongo_database" "main" {
  name                = "tfex-cosmos-mongo-db"
  resource_group_name = azurerm_resource_group.main.name
  account_name        = azurerm_cosmosdb_account.mango.name
  throughput          = 400
}






