use bamazon_db;

insert into products(product_name, department_name, price, stock_quantity)
values ("Monopoly", "board game", 10.99, 20),
		("Clue", "board game", 11.99, 12),
        ("The Real Game of Life", "board game", 19.99, 4),
        ("Battle for Azeroth", "computer game", 49.99, 50),
        ("Earthworm Jim", "video game", 39.99, 17),
        ("Portal 2", "video game", 19.99, 25),
        ("Diablo III", "computer game", 39.99, 28),
        ("Southpark: the Stick of Destiny", "video game", 19.99, 9),
        ("The Sims", "computer game", 59.99, 34),
        ("Mass Effect", "video game", 19.99, 21);
        
        SELECT * FROM bamazon_db.products;