import React from 'react';
import { Typography } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
import './style.less';

const { Title, Paragraph } = Typography;

const TypographyPreview = () => (
  <PreviewWrapper id="Typography" title="Typography">
    <div className="components typography">
      <div className="component-row"><Title>h1. Ant Design</Title></div>
      <div className="component-row"><Title level={2}>h2. Ant Design</Title></div>
      <div className="component-row"><Title level={3}>h3. Ant Design</Title></div>
      <div className="component-row"><Title level={4}>h4. Ant Design</Title></div>
      <div className="component-row">
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>
          Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
          a design language for background applications, is refined by Ant UED Team. Ant Design, a
          design language for background applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team.
        </Paragraph>
      </div>
      <div className="component-row">
        <p className="text-secondary">
          Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
          a design language for background applications, is refined by Ant UED Team. Ant Design, a
          design language for background applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team.
        </p>
      </div>
      <div className="component-row">
        <code>
         function hello () { }
        </code>
      </div>
    </div>
  </PreviewWrapper>
);

export default TypographyPreview;
