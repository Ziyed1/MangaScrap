resource "aws_ecs_cluster" "mangascrapper" {
  name = "mangascrapper-cluster"

  tags = {
    Project = "MangaScrapper"
  }
}

resource "aws_ecs_task_definition" "mangascrapper" {
  family                   = "mangascrapper-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_app_role.arn

  container_definitions = jsonencode([
    {
      name      = "mangascrapper-container"
      image     = "739493233403.dkr.ecr.eu-west-1.amazonaws.com/mangascrapper-backend"
      essential = true
      portMappings = [
        {
          containerPort = 5000
          hostPort      = 5000
        }
      ]
    }
  ])
}