import React, {useEffect, useState} from 'react';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Header from '../header/Header';


function EventDetail(){

    return(
        <div className="container py-5">
           <Header/> 
        </div>
        
    );
}
export default EventDetail;