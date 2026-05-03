import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Badge,Card,Button,Table} from 'react-bootstrap';

export default function EmployeeFilter() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const employed = query.get('employed') || '';

  return (
    <Card>
      <Card.Header as="h5">Filter</Card.Header>
        <Card.Body>
            <Card.Text>
                Currently Employed:{' '}
                <select
                    value={employed}
                    onChange={(e) =>
                    navigate(
                        e.target.value
                        ? `/employees?employed=${e.target.value}`
                        : '/employees'
                    )
                    }
                >
                    <option value="">All</option>
                    <option value="true">Employed</option>
                    <option value="false">Not Employed</option>
                </select>
            </Card.Text>
        </Card.Body>
    </Card>
  );
}