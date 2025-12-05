UPDATE dsa_topics SET video_url = NULL WHERE module_id = (SELECT module_id FROM dsa_modules WHERE title ILIKE '%Binary Trees & BST%' LIMIT 1) AND order_index = 2;
