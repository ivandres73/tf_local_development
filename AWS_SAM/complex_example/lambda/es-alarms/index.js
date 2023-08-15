const { request } = require('https');

exports.handler = async (event) => {
  console.log('event ->', JSON.stringify(event));
  const AlarmMessage = JSON.parse(event?.Records[0]?.Sns?.Message);
  const AlarmStateValue = AlarmMessage.NewStateValue;
  const AlarmName = AlarmMessage.AlarmName;
  let message;
  let title;
  let slackBlocks;
  console.log(AlarmMessage);

  const doubleLineSlackBigBlock = (title, message) => {
    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: title,
          },
        },
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: message,
            emoji: true,
          },
        },
      ],
    };
  };

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
    `MarbylBackendStack2_embeddingServiceCpuAlarm_${process.env.ENVIRONMENT}`
  ) {
    message = `:chart_with_upwards_trend: *[ ${process.env.EMBEDDING_CPU_THRESHOLD}% ] High CPU Utilization of embedding container (ECS-${process.env.ENVIRONMENT})*`;
    slackBlocks = singleLineSlackSmallBlock(message);
  } else if (
    AlarmName ===
    `MarbylBackendStack2_embeddingServiceMemoryAlarm_${process.env.ENVIRONMENT}`
  ) {
    message = `:chart_with_upwards_trend: *[ ${process.env.EMBEDDING_MEMORY_THRESHOLD}% ] High Memory Utilization  of embedding container (ECS-${process.env.ENVIRONMENT})*`;
    slackBlocks = singleLineSlackSmallBlock(message);
  } else if (
    AlarmName ===
    `MarbylUserAppStack_BlockedIndexWritesES_${process.env.ENVIRONMENT}`
  ) {
    title = `:large_red_square: *Index writes blocked (ES-${process.env.ENVIRONMENT})*`;
    message =
      'While the alarm is active, items are not being updated nor indexed to ES';
    slackBlocks = doubleLineSlackBigBlock(title, message);
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
