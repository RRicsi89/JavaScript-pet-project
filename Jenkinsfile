pipeline {
    agent any
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
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push rricsi/jenkins:petproject'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 5000:5000 rricsi/jenkins:petproject'
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}