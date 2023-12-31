
# Local Environment Setup

1. docker pull redis
2. npm install
3. Update .env.local variable
4. npm run dev


# API Documentation

## Overview

This API provides endpoints to manage items and purchase orders. It supports basic operations such as retrieving items, updating item quantity, and managing user purchases.

## Endpoints

### 1. /items

#### GET /items

Get the list of all items with specified price in Ethereum.

**Request:**
```http
GET /items
```

**Response:**
```json
[
    {
        "item": "exampleItem",
        "description": "An example item",
        "quantity": 10,
        "price": 656.8,
        "currency": "ETH"
    },
    // ... other items
]
```

#### POST /items (Admin Only)

Admin-only endpoint to enter a new item.

**Request:**
```http
POST /items
```

**Body:**
```json
{
    "item": "newItem",
    "description": "A new item",
    "quantity": 20,
}
```

**Response:**
```json
{
    "message": "Item created successfully"
}
```

### 2. /items/[slug]

#### PUT /items/[slug] (Admin Only)

Admin-only endpoint to update the quantity of a specific item.

**Request:**
```http
PUT /items/[slug]
```

**Body:**
```json
{
    "quantity": 25
}
```

**Response:**
```json
{
    "message": "Item quantity updated successfully"
}
```

### 3. /purchase

#### GET /purchase

Get the list of all purchases for a user.

**Request:**
```http
GET /purchase
```

**Response:**
```json
[
    {
        "userId": "xxxx-xx-xxx"
    "itemName": "Laptop"
    "datePurchased": "DATE ISO format"
    "quantity": 6
    "amountPaid": 12455
    },
    // ... other purchases
]
```

#### POST /purchase

Create a purchase order for a user.

**Request:**
```http
POST /purchase
```

**Body:**
```json
{
    "item": "exampleItem",
    "quantity": 2
}
```

**Response:**
```json
{
    "message": "Purchase order created successfully"
}
```



This API is designed to be user-friendly and secure, with certain endpoints restricted to admin access for better control over item management.

Feel free to use this documentation as a starting point and customize it according to your specific implementation.
