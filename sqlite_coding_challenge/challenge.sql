-- TASK 1 — Top 5 Customers by Total Spend
-- Tooling/Validation: Ran in SQLite (sqlite3) and cross-checked line totals = quantity * unit_price.
-- Logic: Aggregate line totals from order_items up to orders then customer.
-- Output: customer_full_name, total_spend
SELECT
    c.first_name || ' ' || c.last_name AS customer_full_name,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_spend
FROM orders AS o
JOIN customers AS c
    ON c.id = o.customer_id
JOIN order_items AS oi
    ON oi.order_id = o.id
GROUP BY c.id, c.first_name, c.last_name
ORDER BY total_spend DESC
LIMIT 5;

-- TASK 2 — Total Revenue by Product Category (All Orders)
-- Logic: Sum line totals by product category.
-- Output: category, revenue
SELECT
    p.category AS category,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
FROM order_items AS oi
JOIN products AS p
    ON p.id = oi.product_id
JOIN orders AS o
    ON o.id = oi.order_id
GROUP BY p.category
ORDER BY revenue DESC;

-- TASK 2 (Variant) — Total Revenue by Product Category USING ONLY 'Delivered' Orders
-- Rationale: If "Delivered" approximates realized revenue, filter at the row level.
SELECT
    p.category AS category,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue_delivered_only
FROM order_items AS oi
JOIN products AS p
    ON p.id = oi.product_id
JOIN orders AS o
    ON o.id = oi.order_id
WHERE o.status = 'Delivered'
GROUP BY p.category
ORDER BY revenue_delivered_only DESC;

-- TASK 3 — Employees Earning Above Their Department Average
-- Logic: Compare each employee's salary against their own department's average.
-- Output: first_name, last_name, department_name, employee_salary, department_average
SELECT
    e.first_name,
    e.last_name,
    d.name AS department_name,
    e.salary AS employee_salary,
    ROUND(
        (SELECT AVG(e2.salary)
         FROM employees AS e2
         WHERE e2.department_id = e.department_id),
        2
    ) AS department_average
FROM employees AS e
JOIN departments AS d
    ON d.id = e.department_id
WHERE e.salary >
    (SELECT AVG(e2.salary)
     FROM employees AS e2
     WHERE e2.department_id = e.department_id)
ORDER BY d.name ASC, e.salary DESC;

-- TASK 4 — Cities with the Most Loyal (Gold) Customers
-- Logic: Count customers labeled 'Gold' grouped by city.
-- Output: city, gold_customer_count
SELECT
    c.city AS city,
    COUNT(*) AS gold_customer_count
FROM customers AS c
WHERE c.loyalty_level = 'Gold'
GROUP BY c.city
ORDER BY gold_customer_count DESC, city ASC;

-- TASK 4 (Extension) — Loyalty Distribution by City
-- Logic: Conditional aggregation for Gold/Silver/Bronze counts by city.
SELECT
    c.city AS city,
    SUM(CASE WHEN c.loyalty_level = 'Gold'   THEN 1 ELSE 0 END) AS gold_count,
    SUM(CASE WHEN c.loyalty_level = 'Silver' THEN 1 ELSE 0 END) AS silver_count,
    SUM(CASE WHEN c.loyalty_level = 'Bronze' THEN 1 ELSE 0 END) AS bronze_count,
    COUNT(*) AS total_customers
FROM customers AS c
GROUP BY c.city
ORDER BY gold_count DESC, city ASC;