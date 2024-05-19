import {
  Row,
  Col,
  Card,
  message,
  Typography,
  Button,
  Popconfirm,
  Skeleton,
  Form,
  Input
} from "antd";
import { useEffect, useState } from "react";
import { useEth } from "../contexts/EthContext";

import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";

const { Title} = Typography;

const Admin = () => {
  const navigate = useNavigate();
  const [form] = useForm();

  const {
    state: { contract },
  } = useEth();

  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  const [update, setUpdate] = useState(false);

  const invest = async(values) =>{
    try{
      setLoading(true);
        const account = localStorage.getItem('publicKey');
        await contract.methods.invest().send({from: account, value: values.amount});
        setUpdate(!update);
        message.success("Transaction successful!");
    } catch(err){
        message.destroy();
        message.error("You have to be register to money transfer!");
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    let accountId = localStorage.getItem("publicKey");

    if (contract) {
      const getDetails = async () => {
        setLoading(true);
        try {
          const details = await contract.methods
            .getBankFunds()
            .call({ from: accountId });
          setBalance(details);
        } catch (err) {
        } finally {
          setLoading(false);
        }
      };

      getDetails();
    }
  }, );

  return (
    <Row gutter={20}>
      <Col xs={20} xl={20}>
        <Card title="Money Transfer" bordered={true}>
          {loading ? (
            <Skeleton active />
          ) : (
            <>
              <Form onFinish={invest} form={form}>
                <Form.Item
                  label="Account Number"
                  name="accno"
                  rules={[
                    {
                      required: true,
                      message: "Please enter an account number!",
                    },
                  ]}
                >
                  <Input type="varchar" min={0} />
                </Form.Item>
                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[
                    {
                      required: true,
                      message: "Please enter an amount!",
                    },
                  ]}
                >
                  <Input type="number" min={0} />
                </Form.Item>

                <Popconfirm
                  title={`Are you sure you want to do transaction?`}
                  onConfirm={form.submit}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary">Send</Button>
                </Popconfirm>
              </Form>
            </>
          )}
        </Card>
      </Col>
      <Col xs={20} xl={20}>
        <Card title="Bank Funds" bordered={true}>
          {loading ? (
            <Skeleton active />
          ) : (
            <>
              <Title>{balance} LKR</Title>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Admin;
