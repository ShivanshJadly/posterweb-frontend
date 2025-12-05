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
        script {
          retry(3) {
            sh '''bash -lc "
              set -o pipefail
              export DOCKER_BUILDKIT=1
              docker --version
              docker compose version || true
              docker compose pull || true
              DOCKER_BUILDKIT=1 docker compose build --progress=plain
              docker compose up -d --remove-orphans
            "'''
          }
        }
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
