#!make
build_rabbitmq:
	docker build . --tag rabbitmq
run_rabbitmq:
	docker run -p 5672:5672 -p 15672:15672 --name rabbitmq-container rabbitmq
