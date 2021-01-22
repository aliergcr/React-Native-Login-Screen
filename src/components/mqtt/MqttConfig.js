import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

Amplify.configure({
  Auth: {
    identityPoolId: 'eu-central-1:6cdfda8c-b266-475e-9620-ecb18d81269a',
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_MmfrvJa0e',
    userPoolWebClientId: '7ilub72dbm7i7nss6bbca3groc',
  },
});
Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: 'eu-central-1',
    aws_pubsub_endpoint: `wss://a1sx76ymsgb6ua-ats.iot.eu-central-1.amazonaws.com/mqtt`,
  })
);
Amplify.PubSub.subscribe('led').subscribe({
  next: (data) => console.log('Message received', data),
  error: (error) => console.error(error),
  close: () => console.log('Done'),
});
