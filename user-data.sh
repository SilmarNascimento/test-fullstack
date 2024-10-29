#!/bin/bash
# Use this for your user data (script from top to bottom)
# Install Docker and Docker Compose on Amazon Linux 2

# Update the system
yum update -y

# Install Docker
amazon-linux-extras install docker -y
systemctl start docker
systemctl enable docker

# Add ec2-user to docker group
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install additional tools (optional)
yum install -y git

# Print installed versions
echo "Docker version:"
docker --version
echo "Docker Compose version:"
docker-compose --version

echo "Installation complete!"