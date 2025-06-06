import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import { ColorContext } from './ColorContext/darkContext';
import Home from './Components/Home/Home';
import Orders from './Components/Orders/Orders';
import RegistrationPage from './Components/Registration/registration';
import AddNew from './Pages/AddNew/AddNew';
import BlogDetail from './Pages/BlogDetail/BlogDetail';
import Blogs from './Pages/Blogs/Blogs';
import Detail from './Pages/Detail/Detail';
import Valid from './Pages/Forgot/forgot';
import Login from './Pages/Login/Login';
import Lists from './Pages/UserLists/UserLists';
import Verify from './Pages/VerifyCode/verifycode';
import ResetPassword from './Pages/ResetPassword/ResetPassword';

// Dynamicaly change the data for different pages(replaceable)
const userInpDetails = [
    {
        id: 2,
        name: 'username',
        lable: 'Username',
        type: 'text',
        placeholder: 'John23',
        required: true,
        pattern: '^[A-Za-z0-9]{3,12}$',
        errorMsg: 'Username should be 3-12 characters & should not include any special character!',
    },
    {
        id: 3,
        name: 'name',
        lable: 'Name',
        type: 'text',
        placeholder: 'John Smith',
        required: true,
        pattern: '^[A-Za-z]{1,20}$',
        errorMsg: 'Name is required!',
    },
    {
        id: 4,
        name: 'email',
        lable: 'Email',
        type: 'email',
        placeholder: 'example@email.com',
        required: true,
        errorMsg: 'Enter a valid email!',
    },
    {
        id: 5,
        name: 'password',
        lable: 'Password',
        type: 'password',
        placeholder: 'Password',
        required: true,
        pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,20}$',
        errorMsg:
            'Password should be 6-20 characters and include at last 1 num, 1 letter, 1 special character!',
    },
    {
        id: 6,
        name: 'address',
        lable: 'Address',
        type: 'text',
        placeholder: 'Address',
        required: true,
        errorMsg: 'Address is required!',
    },
];
const productInpDetails = [
    {
        id: 2,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Product title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 3,
        name: 'description',
        lable: 'Description',
        type: 'text',
        placeholder: 'Product description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 4,
        name: 'category',
        lable: 'Category',
        type: 'text',
        placeholder: 'Product category',
        required: true,
        errorMsg: 'Category is required!',
    },
    {
        id: 5,
        name: 'price',
        lable: 'Price',
        type: 'number',
        placeholder: 'Product price',
        required: true,
        errorMsg: 'Price is required!',
    },
    {
        id: 6,
        name: 'stock',
        lable: 'In Stock',
        type: 'text',
        placeholder: 'In Stock',
        required: true,
        errorMsg: 'This field is required!',
    },
];
const orderInpDetails = [
    {
        id: 1,
        name: 'medicine',
        lable: 'Medicine',
        type: 'text',
        placeholder: 'Medicine Name',
        required: true,
        errorMsg: 'Medicine name is required!',
    },
    {
        id: 2,
        name: 'quantity',
        lable: 'Quantity',
        type: 'number',
        placeholder: 'Quantity',
        required: true,
        errorMsg: 'Quantity is required!',
    },
    {
        id: 3,
        name: 'deliveryDate',
        lable: 'Delivery Date',
        type: 'date',
        placeholder: 'Delivery Date',
        required: true,
        errorMsg: 'Delivery date is required!',
    },
    {
        id: 4,
        name: 'company',
        lable: 'Company',
        type: 'text',
        placeholder: 'Company Name',
        required: true,
        errorMsg: 'Company name is required!',
    },
    {
        id: 5,
        name: 'status',
        lable: 'Status',
        type: 'text', // you could change this to select if needed
        placeholder: 'Order Status',
        required: true,
        errorMsg: 'Status is required!',
    },
];
const blogInputs = [
    {
        id: 1,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Blog title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 2,
        name: 'description',
        lable: 'Description',
        type: 'text',
        placeholder: 'Blog description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 3,
        name: 'tags',
        lable: 'Tags',
        type: 'text',
        placeholder: 'Travel, Communication',
        required: true,
        errorMsg: 'Tag is required!',
    },
];

function App() {
    // color state management using react context
    const { darkMode } = useContext(ColorContext);

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="registration" element={<RegistrationPage />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="forgot" element={<Valid />} />
                        <Route path="verifycode" element={<Verify />} />
                        <Route path="/orders" element={<Orders />} />

                        {/* nested routes */}
                        <Route path="users">
                            <Route index element={<Lists type="user" />} />
                            <Route path=":userId" element={<Detail type="USER" />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={userInpDetails}
                                        titlee="Add New User"
                                        type="USER"
                                    />
                                }
                            />
                        </Route>
                        {/* nested routes */}
                        <Route path="products">
                            <Route index element={<Lists type="product" />} />
                            <Route path=":productId" element={<Detail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={productInpDetails}
                                        titlee="Add New Product"
                                        type="PRODUCT"
                                    />
                                }
                            />
                        </Route>

                        <Route path="blogs">
                            <Route index element={<Blogs type="blog" />} />
                            <Route path=":blogId" element={<BlogDetail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew inputs={blogInputs} titlee="Add New Blog" type="BLOG" />
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
