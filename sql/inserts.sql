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

INSERT INTO collections
(title, description, theme)
VALUES
('Delete MeEeEe', 'I am but a wee collection, ready to be deleted from the DB', 'videos');


INSERT INTO collection_resources
(resource_id, collection_id)
VALUES
(1, 1),
(3, 1);

INSERT INTO resource_comments
(resource_id, comment)
VALUES
(1, "What a great video"),
(1, "I'd like a banana"),
(4, "CASH MONEY!");

INSERT INTO collection_comments
(collection_id, comment)
VALUES
(1, "Fab Collection"), 
(1, "Jet fuel can't melt steel beams >:( ");  

INSERT INTO stats
(method, endpoint, hits)
VALUES
('POST', '/resources', 0),
('PUT', '/resources', 0),
('GET', '/resources/{resourceId}', 0),
('DELETE', '/resources/{resourceId}', 0),
('POST', '/resources/{resourceId}', 0),
('POST', '/collections', 0),
('GET', '/collections/{collectionId}', 0),
('DELETE', '/collections/{collectionId}', 0),
('POST', '/collections/{collectionId}', 0),
('PUT', '/collections/{collectionId}', 0);

