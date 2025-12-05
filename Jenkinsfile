pipeline {
  agent any
  environment {
    IMAGE = "my-react-frontend:latest"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build & Docker') {
      steps {
        sh """
          docker --version
          docker compose version || true
          # build image and run compose
          docker compose pull || true
          docker compose build --no-cache
          docker compose up -d --remove-orphans
        """
      }
    }
  }
  post {
    success {
      echo "Deployed: http://${env.BUILD_URL}"
    }
    failure {
      echo "Build failed. Check console output."
    }
  }
}
