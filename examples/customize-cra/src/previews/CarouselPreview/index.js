import React from 'react';
import { Carousel } from 'antd';
import PreviewWrapper from '../PreviewWrapper';
import './style.less';

const CarouselPreview = () => (
  <PreviewWrapper id="Carousel" title="Carousel">
    <div className="components">
      <div className="component-row">
        <Carousel autoplay>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
      </div>
    </div>
  </PreviewWrapper>
);

export default CarouselPreview;
