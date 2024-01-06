pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                echo 'Hello World from github'
            }
        }
        stage('Build') {
            steps {
                echo 'Building'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'AWS S3 Access',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]){
                        sh(script: 'aws s3 cp --recursive /var/lib/jenkins/workspace/PipeLineTest/docs/. s3://stg-env23438597-jenkins/doc/')
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
                script {
                    def url = 'https://stg-env23438597-jenkins.s3.ap-northeast-1.amazonaws.com/testa.html'
                    def response = sh(script: "curl -s -o /dev/null -w '%{http_code}' '$url'", returnStdout: true)

                    if (response == '200') {
                        echo 'Test OK'
                    } else {
                        echo response
                        error 'Test NG'
                    }
                }
            }
        }
        stage('Release') {
            steps {
                echo 'Releasing'
            }
        }
    }
}
