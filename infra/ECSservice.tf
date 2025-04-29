resource "aws_ecs_service" "mangascrapper" {
  name            = "mangascrapper-service"
  cluster         = aws_ecs_cluster.mangascrapper.id
  task_definition = aws_ecs_task_definition.mangascrapper.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets         = [
      aws_subnet.public_1.id,
      aws_subnet.public_2.id
    ]
    security_groups = [aws_security_group.fargate_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.mangascrapper.arn
    container_name   = "mangascrapper-container"
    container_port   = 5000
  }

  depends_on = [
    aws_lb_listener.http
  ]
}