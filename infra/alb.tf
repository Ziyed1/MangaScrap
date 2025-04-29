resource "aws_lb" "mangascrapper" {
  name               = "mangascrapper-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [
    aws_subnet.public_1.id,
    aws_subnet.public_2.id
  ]

  tags = {
    Project = "MangaScrapper"
  }
}

resource "aws_lb_target_group" "mangascrapper" {
  name     = "mangascrapper-tg"
  port     = 5000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  target_type = "ip"

  health_check {
    path                = "/api/mangas"
    protocol            = "HTTP"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Project = "MangaScrapper"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.mangascrapper.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.mangascrapper.arn
  }
}
