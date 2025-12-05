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
            sh '''
              set -o pipefail
              export DOCKER_BUILDKIT=1
              docker --version
              docker compose version || true
              # pull images if available
              docker compose pull || true
              # build — do NOT use --no-cache so dependency layer is cached
              DOCKER_BUILDKIT=1 docker compose build --progress=plain
              docker compose up -d --remove-orphans
            '''
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
