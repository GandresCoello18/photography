import { Col, Row } from 'antd';
import React from 'react';
import { Head } from './head';
import { NavBar } from './navBar';

interface props {
    children: any;
    TitleHead: string;
}

export function Layout({ children, TitleHead }: props){
    return(
        <>
            <Head title={TitleHead} />
            <Row justify='center'>
                <Col xs={24} md={10} style={{ backgroundColor: '#fff' }}>
                    {children}
                    <NavBar />
                </Col>
            </Row>
        </>
    );
}