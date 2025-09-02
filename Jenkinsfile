pipeline {
    agent {
        node {
            label 'docker-agent'
        }
    }

    triggers {
        pollSCM('*/5 * * * *')
    }
     
    stages {
        stage('Build') {
            steps {
                sh 'echo "Building..."'
                sh '''
                cd node-app
                npm install
                '''
            }
        }
        stage('Test') {
            steps {
                sh 'echo "Testing..."'
                sh '''
                cd node-app
                npm test
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "Deploying..."'
                sh '''
                cd node-app
                node hello.js
                '''
            }
        }
    }
}
