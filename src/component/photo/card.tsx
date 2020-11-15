import { Col, Row } from 'antd';
import React from 'react';

interface Props {
    Photo: any;
}

export function CardPhoto({ Photo }: Props){
    return(
        <>
            <Row justify='space-around'>
                <Col span={14}>
                    user
                </Col>
                <Col span={8}>
                    fecha
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={24}>
                    <img src={Photo.urls.small} width='100%' alt='foto' height='auto' />
                </Col>
            </Row>
            <Row justify='space-around'>
                <Col span={7}>
                    like
                </Col>
                <Col span={7}>
                    comment
                </Col>
                <Col span={7}>
                    share
                </Col>
            </Row>
        </>
    );
}
