pipeline {
    agent any

    environment {
        IMAGE_NAME = "devasundari/sip-calci"
        IMAGE_TAG  = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Create Firebase Environment') {
            steps {
                withCredentials([string(
                    credentialsId: 'firebase-env',
                    variable: 'FIREBASE_ENV'
                )]) {
                    sh '''
                        printf '%s\\n' "$FIREBASE_ENV" > .env
                	echo "Firebase environment file created"
                	test -s .env
                	echo ".env exists and is not empty"
                    '''
                }
            }
        }


        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push $IMAGE_NAME:$IMAGE_TAG
                    docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Docker image pushed successfully!"
        }

        failure {
            echo "Pipeline failed!"
        }
    }
}
