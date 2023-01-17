pipeline {
    agent {
        docker {
            image 'rancher/dind:v1.10.3-rancher1'
        }
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('DockerHub_Credentials')
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t rricsi/jenkins:petproject .'
            }
        }
        stage('Push') {
            steps {
                sh 'docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW'
                sh 'docker push rricsi/jenkins:petproject'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 5000:5000 rricsi/jenkins:petproject'
            }
        }
    }
}