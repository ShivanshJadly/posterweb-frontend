pipeline {
  agent any
  environment {
    AWS_REGION = "us-east-1"
    IMAGE_NAME = "my-react"
    AWS_ACCOUNT_ID = "976042702146"
    ECR_REPO = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_NAME}"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Debug environment') {
      steps {
        sh '''
          echo "=== workspace files ==="
          ls -la
          echo "=== docker ==="
          docker version || true
          echo "=== aws (host) ==="
          aws --version || true
        '''
      }
    }

    stage('Build Docker image') {
      steps {
        script {
          // Requires Docker on Jenkins agent
          docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
        }
      }
    }

    stage('Login to ECR and Push') {
      steps {
        // Load AWS credentials from Jenkins credential ID = aws-deploy
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-deploy']]) {

          sh '''
            set -e

            echo "=== Checking AWS identity ==="
            aws sts get-caller-identity --region ${AWS_REGION}

            echo "=== Logging in to ECR ==="
            aws ecr get-login-password --region ${AWS_REGION} \
              | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

            echo "=== Creating repo if not exists ==="
            aws ecr describe-repositories --repository-names ${IMAGE_NAME} --region ${AWS_REGION} \
              || aws ecr create-repository --repository-name ${IMAGE_NAME} --region ${AWS_REGION}

            echo "=== Tag and push image ==="
            docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${ECR_REPO}:${BUILD_NUMBER}
            docker push ${ECR_REPO}:${BUILD_NUMBER}
          '''
        }
      }
    }
  }

  post {
    success {
      echo "Pipeline succeeded: ${env.BUILD_URL}"
    }
    failure {
      echo "Pipeline failed: ${env.BUILD_URL}"
    }
  }
}

