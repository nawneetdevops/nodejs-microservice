pipeline {
    agent any
 
    environment {
        AWS_ACCOUNT_ID = "908862620161"
        AWS_REGION = "ap-south-1"
        ECR_REPOSITORY = "nodejs"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
 
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        docker build -t ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG} .
                    """
                }
            }
        }
 
        stage('AWS ECR Login') {
            steps {
                script {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                    """
                }
            }
        }
 
        stage('Push to ECR') {
            steps {
                script {
                    sh """
                        docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}
                    """
                }
            }
        }
 
        stage('Update Kubernetes Deployment') {
            steps {
                script {
                    // Replace image tag in deploy.yaml
                    sh """
                        sed -i 's|image:.*|image: ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}|g' deploy.yaml

                        kubectl apply -f deploy.yaml
                    """
                }
            }
        }
    }
 
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}