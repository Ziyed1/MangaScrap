output "users_table_name" {
  description = "Name of the Users DynamoDB Table"
  value       = aws_dynamodb_table.users.name
}