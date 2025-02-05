

.PHONY: k6-up k6-down playwright-up playwright-down

k6-up:
	docker-compose up k6

k6-down:
	docker-compose down k6

playwright-up:
	docker-compose up playwright

playwright-down:
	docker-compose down playwright
