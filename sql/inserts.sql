INSERT INTO resources
(url, title, description)
VALUES
("https://www.youtube.com/watch?v=uA8X5zNOGw8&t=3s", "pthreads in C", "A video about pthreads"),
("https://www.youtube.com/watch?v=axngwDJ79GY", "function pointers in C", "All about function pointers"),
("https://www.youtube.com/watch?v=It0OFCbbTJE", "Pass arguments to and get values from threads", "Arguments and values in threads");

INSERT INTO collections
(title, description, theme)
VALUES
('PThreads', 'pthreads from Jacob Sorber', 'videos');

INSERT INTO collection_resources
(resource_id, collection_id)
VALUES
(1, 1),
(3, 1);