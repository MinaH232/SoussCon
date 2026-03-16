// src/pages/AdminDashboard.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { Navigate } from "react-router-dom";

// Standardize styling across tabs
const tabStyle = (isActive) => ({
  padding: '0.75rem 1.5rem',
  background: isActive ? '#0056b3' : 'transparent',
  color: isActive ? 'white' : '#333',
  border: 'none',
  borderRadius: '5px 5px 0 0',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all 0.3s'
});

const AdminDashboard = () => {
  const { user, users, adminLogs, adminCreateUser, deleteUser } = useContext(AuthContext);
  const { products, addProduct, deleteProduct } = useContext(ProductContext);
  const [activeTab, setActiveTab] = useState("overview");

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '80vh' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', color: '#333' }}>Admin Dashboard</h2>
      
      {/* Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #ccc', marginBottom: '2rem', overflowX: 'auto' }}>
        <button onClick={() => setActiveTab('overview')} style={tabStyle(activeTab === 'overview')}>Overview</button>
        <button onClick={() => setActiveTab('users')} style={tabStyle(activeTab === 'users')}>Manage Users</button>
        <button onClick={() => setActiveTab('products')} style={tabStyle(activeTab === 'products')}>Manage Products</button>
        <button onClick={() => setActiveTab('orders')} style={tabStyle(activeTab === 'orders')}>Manage Orders</button>
        <button onClick={() => setActiveTab('logs')} style={tabStyle(activeTab === 'logs')}>Action Logs</button>
      </div>

      {/* Content Areas */}
      {activeTab === 'overview' && <OverviewTab users={users} products={products} />}
      {activeTab === 'users' && <UsersTab users={users} adminCreateUser={adminCreateUser} deleteUser={deleteUser} />}
      {activeTab === 'products' && <ProductsTab products={products} addProduct={addProduct} deleteProduct={deleteProduct} />}
      {activeTab === 'orders' && <OrdersTab />}
      {activeTab === 'logs' && <LogsTab logs={adminLogs} />}

    </div>
  );
};

// --- View Tabs ---

const OverviewTab = ({ users, products }) => {
  const vendors = users.filter(u => u.role === "vendor").length;
  const delivery = users.filter(u => u.role === "delivery").length;
  const clients = users.filter(u => u.role === "client").length;

  return (
    <div>
      <h3>System Overview</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
        <StatCard title="Total Users" value={users.length} color="#0056b3" />
        <StatCard title="Active Clients" value={clients} color="#17a2b8" />
        <StatCard title="Active Vendors" value={vendors} color="#ffb300" />
        <StatCard title="Delivery Workers" value={delivery} color="#28a745" />
        <StatCard title="Total Products" value={products.length} color="#6f42c1" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
    <h4 style={{ margin: 0, color: '#666', fontSize: '1.1rem' }}>{title}</h4>
    <p style={{ margin: '0.5rem 0 0', fontSize: '2.5rem', fontWeight: 'bold', color: color }}>{value}</p>
  </div>
);

const UsersTab = ({ users, adminCreateUser, deleteUser }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "vendor" });

  const handleCreate = (e) => {
    e.preventDefault();
    const res = adminCreateUser(form.name, form.email, form.password, form.role);
    alert(res.message);
    if (res.success) setForm({ name: "", email: "", password: "", role: "vendor" });
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Create User Form */}
      <div style={{ flex: '1 1 300px', background: '#f8f9fa', padding: '1.5rem', borderRadius: '10px' }}>
        <h3>Create Accounts</h3>
        <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>Securely provision staff accounts.</p>
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="form-control" />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="form-control" />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required className="form-control" />
          <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="form-control">
            <option value="vendor">Vendor</option>
            <option value="delivery">Delivery Worker</option>
            <option value="admin">System Admin</option>
          </select>
          <button type="submit" className="btn btn-primary">Create User</button>
        </form>
      </div>

      {/* User List */}
      <div style={{ flex: '2 1 500px' }}>
        <h3>All Users</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ background: '#eee', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>Name</th>
              <th style={{ padding: '0.75rem' }}>Email</th>
              <th style={{ padding: '0.75rem' }}>Role</th>
              <th style={{ padding: '0.75rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '0.75rem' }}>{u.name}</td>
                <td style={{ padding: '0.75rem' }}>{u.email}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '15px', 
                    fontSize: '0.8rem',
                    background: u.role === 'admin' ? '#dc3545' : (u.role === 'vendor' ? '#ffc107' : (u.role === 'delivery' ? '#28a745' : '#17a2b8')),
                    color: u.role === 'vendor' ? '#000' : '#fff'
                  }}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  {u.email !== 'admin@test.com' && (
                    <button onClick={() => deleteUser(u.email)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProductsTab = ({ products, addProduct, deleteProduct }) => {
  const [form, setForm] = useState({ name: "", price: "", category: "Local Food", description: "", image: "https://via.placeholder.com/300" });

  const handleAdd = (e) => {
    e.preventDefault();
    const res = addProduct({ ...form, price: parseFloat(form.price) });
    if(res.success) {
      alert("Product added!");
      setForm({ name: "", price: "", category: "Local Food", description: "", image: "https://via.placeholder.com/300" });
    } else {
      alert(res.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', background: '#f8f9fa', padding: '1.5rem', borderRadius: '10px' }}>
          <h3>Add New Product</h3>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="text" placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="form-control" />
            <input type="number" placeholder="Price (MAD)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required className="form-control" />
            <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required className="form-control" />
            <input type="text" placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required className="form-control" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required className="form-control" rows="3" />
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>

        <div style={{ flex: '2 1 500px' }}>
           <h3>Catalog ({products.length})</h3>
           <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ background: '#eee', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem' }}>Name</th>
                  <th style={{ padding: '0.75rem' }}>Price</th>
                  <th style={{ padding: '0.75rem' }}>Category</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '0.75rem' }}>{p.name}</td>
                    <td style={{ padding: '0.75rem' }}>{p.price} MAD</td>
                    <td style={{ padding: '0.75rem' }}>{p.category}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <button onClick={() => deleteProduct(p.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           </div>
        </div>
      </div>
    </div>
  );
};

const OrdersTab = () => {
   // Mock orders for Admin view
   const orders = [
    { id: 'ORD-001', customer: 'Client One', item: 'Argan Oil', status: 'Pending', total: 150 },
    { id: 'ORD-002', customer: 'Client Two', item: 'Amlou', status: 'Shipped', total: 90 },
    { id: 'ORD-003', customer: 'Client Three', item: 'Amazigh Rug', status: 'Delivered', total: 1200 },
   ];

   return (
     <div>
       <h3>Global Orders</h3>
       <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '0.75rem' }}>Order ID</th>
            <th style={{ padding: '0.75rem' }}>Customer</th>
            <th style={{ padding: '0.75rem' }}>Item</th>
            <th style={{ padding: '0.75rem' }}>Total</th>
            <th style={{ padding: '0.75rem' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{o.id}</td>
              <td style={{ padding: '0.75rem' }}>{o.customer}</td>
              <td style={{ padding: '0.75rem' }}>{o.item}</td>
              <td style={{ padding: '0.75rem' }}>{o.total} MAD</td>
              <td style={{ padding: '0.75rem' }}>
                <select defaultValue={o.status} className="form-control" style={{ padding: '0.25rem' }}>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
     </div>
   )
};

const LogsTab = ({ logs }) => {
  return (
    <div>
      <h3>System Action Logs</h3>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>Immutable record of critical administrative actions.</p>
      
      {logs.length === 0 ? (
        <p>No actions logged yet.</p>
      ) : (
        <div style={{ background: '#2c3e50', padding: '1.5rem', borderRadius: '10px', color: '#ecf0f1', maxHeight: '500px', overflowY: 'auto' }}>
          {logs.map(log => (
            <div key={log.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #34495e', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#aaa', fontSize: '0.8rem', display: 'block' }}>{new Date(log.timestamp).toLocaleString()}</span>
              <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>&gt; {log.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default AdminDashboard;
