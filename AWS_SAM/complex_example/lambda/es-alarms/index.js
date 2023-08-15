const { request } = require('https');

exports.handler = async (event) => {
  console.log('event ->', JSON.stringify(event));
  const AlarmMessage = JSON.parse(event?.Records[0]?.Sns?.Message);
  const AlarmStateValue = AlarmMessage.NewStateValue;
  const AlarmName = AlarmMessage.AlarmName;
  let message;
  let slackBlocks;
  console.log(AlarmMessage);

  const singleLineSlackSmallBlock = (message) => {
    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message,
          },
        },
      ],
    };
  };

  if (
    AlarmName ===
    `ECS_Service_CPU_Alarm_${process.env.ENVIRONMENT}`
  ) {
    message = `:chart_with_upwards_trend: *[ ${process.env.EMBEDDING_CPU_THRESHOLD}% ] High CPU Utilization of container (ECS-${process.env.ENVIRONMENT})*`;
    slackBlocks = singleLineSlackSmallBlock(message);
  } else if (
    AlarmName ===
    `ECS_Service_Memory_Alarm_${process.env.ENVIRONMENT}`
  ) {
    message = `:chart_with_upwards_trend: *[ ${process.env.EMBEDDING_MEMORY_THRESHOLD}% ] High Memory Utilization  of container (ECS-${process.env.ENVIRONMENT})*`;
    slackBlocks = singleLineSlackSmallBlock(message);
  }

  if (AlarmStateValue === 'ALARM') {
    const sendSlackMessage = (slackBlocks) => {
      return new Promise((resolve, reject) => {
        const req = request({
          hostname: 'hooks.slack.com',
          method: 'POST',
          path: process.env.WEBHOOK_URL,
        });

        req.write(JSON.stringify(slackBlocks));
        req.end();

        req.on('response', (res) => {
          resolve(res);
        });

        req.on('error', (err) => {
          reject(err);
        });
      });
    };

    await sendSlackMessage(slackBlocks);
  }
};
