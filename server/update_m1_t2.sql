UPDATE dsa_topics SET video_url = 'https://www.youtube.com/watch?v=9S-b52CSCbQ' WHERE module_id = (SELECT module_id FROM dsa_modules WHERE order_index = 1) AND order_index = 2;
