## 참고사항

### yaml 파일 실행 순서
1. **eks-cluster.yaml**
2. **fargate-profile.yaml**
3. **eks-docdb.yaml**

### Region
아시아 태평양 (서울)  ap-northeast-2

### 이후 작업
1. aws eks --region us-west-2 update-kubeconfig --name ControlPlane --region ap-northeast-2

2. kubectl patch deployment coredns -n kube-system --type json -p='[{"op": "remove", "path": "/spec/template/metadata/annotations/eks.amazonaws.com~1compute-type"}]'

3. git clone https://github.com/kva231/Daily-Log.git  
   cd Daily-Log  
   cd eks-fargate-docdb

4. kubectl create ns dailylog  
   kubectl apply -f backend.yaml  
   kubectl apply -f frontend.yaml

5. eksctl utils associate-iam-oidc-provider --cluster ControlPlane --approve --region ap-northeast-2

   curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.2.0/docs/install/iam_policy.json

   aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json --region ap-northeast-2

   eksctl create iamserviceaccount --cluster=ControlPlane --namespace=kube-system --name=aws-load-balancer-controller --attach-policy-arn=arn:aws:iam::710836223938:policy/AWSLoadBalancerControllerIAMPolicy --override-existing-serviceaccounts --approve --region ap-northeast-2

   eksctl get iamserviceaccount --cluster ControlPlane --name aws-load-balancer-controller --namespace kube-system --region ap-northeast-2

6. helm repo add eks https://aws.github.io/eks-charts

   kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller//crds?ref=master"

   helm install aws-load-balancer-controller eks/aws-load-balancer-controller --set clusterName=ControlPlane --set serviceAccount.create=false --set region=ap-northeast-2 --set vpcId=vpc-0ec4a1a3490a51141 --set serviceAccount.name=aws-load-balancer-controller -n kube-system  
   **\#### vpcId에 사용하고자 하는 VPC의 ID를 넣을 것**

7. kubectl apply -f ingress.yaml

8. kubectl apply -f component.yaml  
   kubectl apply -f frontend-hpa.yaml  
   kubectl apply -f backend-hpa.yaml

### 참고
- https://aws.amazon.com/ko/premiumsupport/knowledge-center/eks-alb-ingress-controller-fargate/
