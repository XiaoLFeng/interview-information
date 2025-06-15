import { QuestionCard } from "../../../../base/knowledge_question_card";
import { InfoCard } from "../../../../card/info_card";
import { WarningCard } from "../../../../card/warning_card";
import { SuccessCard } from "../../../../card/success_card";
import { SecondaryCard } from "../../../../card/secondary_card";
import { ExpandableCode } from "../../../../base/expandable_code";

interface Props {
    id: string;
}

export function GoDatabases({ id }: Props) {
    return (
        <QuestionCard
            question={{
                id,
                title: "Go 操作数据库",
                category: "Go",
                content: "如何在 Go 语言中连接和操作数据库？包括标准库 `database/sql` 和常用 ORM。",
                tags: ["Go", "Golang", "数据库", "SQL", "database/sql", "ORM", "GORM"]
            }}
        >
            <div className="space-y-6">
                <SuccessCard title="核心概要">
                    <p>数据库交互是大多数应用程序的核心功能。Go 语言通过标准库 <code>database/sql</code> 包提供了一套通用的、与具体数据库驱动无关的接口来执行 SQL 操作。此外，诸如 <strong>GORM</strong> 等对象关系映射器 (ORM) 提供了更高级别的抽象，简化了数据库操作和模型管理。</p>
                </SuccessCard>

                <SecondaryCard title="标准库 `database/sql`">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">概述</h4>
                            <p><code>database/sql</code> 包本身不提供任何数据库驱动，而是定义了一系列接口。开发者需要配合特定数据库的驱动程序（如 <code>github.com/go-sql-driver/mysql</code>, <code>github.com/lib/pq</code> for PostgreSQL）来使用。</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">连接数据库</h4>
                            <p>使用 <code>sql.Open(driverName, dataSourceName)</code> 来打开一个数据库连接。<code>dataSourceName</code> (DSN) 的格式因数据库驱动而异。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`package main

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql" // 匿名导入 MySQL 驱动
)

func main() {
    // DSN 格式: user:password@tcp(host:port)/dbname
    db, err := sql.Open("mysql", "user:password@tcp(127.0.0.1:3306)/testdb")
    if err != nil {
        panic(err.Error())
    }
    defer db.Close() // 确保在函数返回时关闭连接

    err = db.Ping() // 检查连接是否成功
    if err != nil {
        panic(err.Error())
    }
    fmt.Println("Successfully connected to MySQL!")
}`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">执行查询</h4>
                            <ul className="list-disc pl-5">
                                <li><code>db.QueryRow()</code>: 执行只返回单行的查询（例如通过 ID 查询）。</li>
                                <li><code>db.Query()</code>: 执行返回多行的查询。</li>
                                <li><code>db.Exec()</code>: 执行不返回行的语句（如 INSERT, UPDATE, DELETE）。</li>
                            </ul>
                            <ExpandableCode language="go" maxHeight={180}>
{`// 查询单行
var name string
var age int
err = db.QueryRow("SELECT name, age FROM users WHERE id = ?", 1).Scan(&name, &age)
if err != nil {
    if err == sql.ErrNoRows {
        // 处理未找到行的情况
    } else {
        // 处理其他错误
    }
}

// 查询多行
rows, err := db.Query("SELECT id, name FROM users WHERE age > ?", 30)
if err != nil { /* ... */ }
defer rows.Close()

for rows.Next() {
    var id int
    var name string
    if err := rows.Scan(&id, &name); err != nil { /* ... */ }
    fmt.Printf("ID: %d, Name: %s\\n", id, name)
}
if err := rows.Err(); err != nil { /* 检查循环中是否有错误 ... */ }

// 执行非查询语句
result, err := db.Exec("INSERT INTO users (name, age) VALUES (?, ?)", "Alice", 25)
if err != nil { /* ... */ }
lastInsertId, _ := result.LastInsertId()
rowsAffected, _ := result.RowsAffected()`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">预处理语句 (Prepared Statements)</h4>
                            <p>预处理语句可以提高性能并有效防止 SQL 注入。使用 <code>db.Prepare()</code> 创建，然后可以多次执行。</p>
                            <ExpandableCode language="go" maxHeight={120}>
{`stmt, err := db.Prepare("INSERT INTO users (name, age) VALUES (?, ?)")
if err != nil { /* ... */ }
defer stmt.Close()

_, err = stmt.Exec("Bob", 30)
if err != nil { /* ... */ }
_, err = stmt.Exec("Charlie", 35)
if err != nil { /* ... */ }`}
                            </ExpandableCode>
                        </div>
                        <div>
                            <h4 className="font-semibold">事务 (Transactions)</h4>
                            <p>使用 <code>db.Begin()</code> 开始一个事务，然后使用 <code>tx.Commit()</code> 或 <code>tx.Rollback()</code> 提交或回滚。事务内的操作使用 <code>tx.Query()</code>, <code>tx.Exec()</code> 等。</p>
                            <ExpandableCode language="go" maxHeight={150}>
{`tx, err := db.Begin()
if err != nil { /* ... */ }

_, err = tx.Exec("UPDATE accounts SET balance = balance - ? WHERE id = ?", 100, 1)
if err != nil {
    tx.Rollback() // 出错时回滚
    // ...
    return
}
_, err = tx.Exec("UPDATE accounts SET balance = balance + ? WHERE id = ?", 100, 2)
if err != nil {
    tx.Rollback()
    // ...
    return
}

err = tx.Commit() // 提交事务
if err != nil { /* ... */ }`}
                            </ExpandableCode>
                        </div>
                         <div>
                            <h4 className="font-semibold">CRUD 示例 (简要)</h4>
                            <ExpandableCode language="go" maxHeight={200}>
{`// Create
db.Exec("INSERT INTO products (name, price) VALUES (?, ?)", "Laptop", 999.99)

// Read (Single)
var productName string
var productPrice float64
db.QueryRow("SELECT name, price FROM products WHERE id = ?", 1).Scan(&productName, &productPrice)

// Read (Multiple) - 见上方 db.Query() 示例

// Update
db.Exec("UPDATE products SET price = ? WHERE id = ?", 1099.99, 1)

// Delete
db.Exec("DELETE FROM products WHERE id = ?", 1)`}
                            </ExpandableCode>
                        </div>
                    </div>
                </SecondaryCard>

                <SecondaryCard title="ORM 简介 - GORM">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">什么是 ORM?</h4>
                            <p>对象关系映射器 (ORM) 是一种编程技术，用于在关系数据库和面向对象编程语言之间转换数据。它允许开发者使用面向对象的方式来操作数据库，而无需编写大量的 SQL 语句。</p>
                            <p><strong>优点:</strong> 提高开发效率、减少重复的 SQL 代码、面向对象操作、某些情况下有助于数据库迁移。</p>
                            <p><strong>缺点:</strong> 可能产生低效的 SQL、学习曲线、隐藏了 SQL 的复杂性、对于复杂查询可能不够灵活。</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">GORM 简介</h4>
                            <p>GORM 是 Go 语言中一个功能强大、广受欢迎的 ORM 库。它提供了模型定义、关联、事务、迁移等丰富特性。</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">GORM 基本使用</h4>
                            <ExpandableCode language="go" maxHeight={250}>
{`package main

import (
    "fmt"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

// 定义模型 (Model)
type Product struct {
    gorm.Model // 内嵌 gorm.Model, 包含 ID, CreatedAt, UpdatedAt, DeletedAt
    Code  string
    Price uint
}

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/testdb?charset=utf8mb4&parseTime=True&loc=Local"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // 自动迁移 (创建或更新表结构)
    db.AutoMigrate(&Product{})

    // Create
    db.Create(&Product{Code: "D42", Price: 100})

    // Read
    var product Product
    db.First(&product, 1) // 根据整型主键查找
    fmt.Printf("Product (ID 1): %+v\\n", product)

    db.First(&product, "code = ?", "D42") // 根据条件查找
    fmt.Printf("Product (Code D42): %+v\\n", product)

    // Update - 更新单个字段
    db.Model(&product).Update("Price", 200)
    // Update - 更新多个字段
    db.Model(&product).Updates(Product{Price: 200, Code: "F42"}) // 仅更新非零值字段
    db.Model(&product).Updates(map[string]interface{}{"Price": 200, "Code": "F42"})

    // Delete
    // db.Delete(&product, 1) // 删除 ID 为 1 的产品 (软删除，如果模型包含 gorm.DeletedAt)
}
`}
                            </ExpandableCode>
                        </div>
                        <p className="text-sm text-base-content/70">GORM 功能非常丰富，包括关联（一对一、一对多、多对多）、钩子、事务、预加载等。这仅仅是一个入门介绍。</p>
                    </div>
                </SecondaryCard>

                <InfoCard title="选择与最佳实践">
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong><code>database/sql</code> vs. ORM:</strong>
                            <ul className="list-disc pl-5">
                                <li>对于简单的应用或需要极致性能和 SQL 控制的场景，<code>database/sql</code> 是不错的选择。</li>
                                <li>对于复杂的应用、需要快速开发、模型关系复杂的场景，ORM (如 GORM) 可以显著提高效率。</li>
                            </ul>
                        </li>
                        <li><strong>连接池:</strong> <code>database/sql</code> 内部维护一个连接池。可以通过 <code>db.SetMaxOpenConns()</code>, <code>db.SetMaxIdleConns()</code>, <code>db.SetConnMaxLifetime()</code> 来配置。合理配置连接池对性能至关重要。</li>
                        <li><strong>处理 <code>sql.ErrNoRows</code>:</strong> 在使用 <code>QueryRow().Scan()</code> 时，如果查询没有返回行，会返回 <code>sql.ErrNoRows</code>。务必检查并妥善处理此错误，而不是将其视为普通错误。</li>
                        <li><strong>SQL 注入:</strong> 始终优先使用预处理语句 (Prepared Statements) 或 ORM 提供的查询构建器来防止 SQL 注入攻击。避免直接拼接字符串来构造 SQL 查询。</li>
                        <li><strong>错误处理:</strong> Go 的错误处理机制要求显式检查每个可能返回错误的操作。不要忽略数据库操作返回的错误。</li>
                        <li><strong>关闭资源:</strong> 确保使用 <code>defer rows.Close()</code> 和 <code>defer stmt.Close()</code> 来关闭 <code>sql.Rows</code> 和 <code>sql.Stmt</code>，防止资源泄漏。<code>db.Close()</code> 也应在程序结束时调用。</li>
                    </ul>
                </InfoCard>
            </div>
        </QuestionCard>
    );
}
