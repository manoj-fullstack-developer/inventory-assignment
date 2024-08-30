# Inventory management system

A simple and efficient inventory tracking app built with Next.js and TypeScript, designed to help users manage products and inventory levels. The app features CRUD operations for products, inventory management updates, order creation, and a comprehensive log page to track all inventory changes.

## Tech Stack

**Client:** Next Js, TailwindCSS, TypeScript

**ORM:** Mongoose

**Database:** MongoDB

**Deployment:** Vercel

# Features

Product Management:

Create, Update, Delete Products: Users can easily add new products, update existing product details, or delete products from the inventory.
Product Fields: Each product includes essential fields such as name, description, price, and stock level.
Data Validation: Ensures that all product data is accurate and consistent, preventing invalid entries.

Inventory Management:

Adjust Inventory Levels: Users can add to or subtract from the stock of a product with a simple interface.
Inventory Limits: Set a maximum stock level of 1000 to ensure realistic inventory management.
Track Inventory Changes: Automatically logs every inventory adjustment for easy tracking and auditing.

Order Creation:

Sell Products: Users can create orders by selling products, specifying customer email and product quantity.
Order Logging: Every order creation is logged, allowing users to keep track of sales and inventory changes.

Product Listing:

Comprehensive Product Display: Lists all products with key details like product name, price, and current stock level.
Search and Filter: Enables users to quickly find specific products. Filter products by:
In-stock Status: Shows only products that are currently in stock.
Alphabetical Order (A to Z): Sorts products by name from A to Z.
Reverse Alphabetical Order (Z to A): Sorts products by name from Z to A.

Inventory Logs:

Detailed Logs Page: Displays a comprehensive history of all inventory changes, including product stock

## Run Locally

Clone the project

```bash
  git clone https://github.com/manoj-fullstack-developer/inventory-assignment
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## API Reference

#### Get Products List

```http
  GET /api/products
```

#### Create Product

```http
  POST /api/products
```

| Body          | Type     |
| :------------ | :------- |
| `name`        | `string` |
| `description` | `string` |
| `price`       | `number` |
| `stock`       | `number` |

#### Update Product

```http
  PUT /api/products
```

| Body        | Type     |
| :---------- | :------- |
| `productId` | `string` |

#### Delete Product

```http
  DELETE /api/products
```

| Query Param | Type     |
| :---------- | :------- |
| `productId` | `string` |

#### Search Product

```http
  POST /api/products/search
```

| Body   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Inventory Logs

```http
  GET /api/all-logs
```

#### Update Inventory

```http
  PUT /api/inventory
```

| Body        | Type              |
| :---------- | :---------------- |
| `productId` | `string`          |
| `stock`     | `number`          |
| `type`      | `add or subtract` |

#### Create Order

```http
  POST /api/order
```

| Body        | Type     |
| :---------- | :------- |
| `productId` | `string` |
| `stock`     | `number` |
| `type`      | `string` |

## 🚀 About Me

Full Stack Developer with over 12 years of experience in JavaScript, React, Node.js, Redux, .NET, C#, and TypeScript. I have led the development of numerous research projects and have built applications handling millions of users. My strong logical and technical skills, combined with my ability to quickly adapt to new technologies, enable me to tackle complex problems efficiently. I am seeking a full-time role where I can confront new challenges and utilize my interpersonal skills, time management, and problem-solving abilities. I am committed to achieving ambitious development goals on tight schedules, delivering high-quality code, and managing multiple projects with precision and attention to detail.
