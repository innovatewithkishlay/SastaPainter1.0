import React, { useState, useEffect } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaSearch, FaUserShield, FaUser } from 'react-icons/fa';
import AdminLayout from '../components/AdminLayout';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchUsers();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, roleFilter]);

    const fetchUsers = async () => {
        try {
            const res = await api.get(`/admin/users?search=${searchQuery}&role=${roleFilter}`, { triggerLoader: true });
            if (res.data.success) {
                setUsers(res.data.data.users);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        try {
            const res = await api.delete(`/admin/users/${userToDelete._id}`);
            if (res.data.success) {
                setUsers(users.filter(u => u._id !== userToDelete._id));
                setShowDeleteModal(false);
                setUserToDelete(null);
            }
        } catch (err) {
            console.error('Delete User Error:', err);
        }
    };

    return (
        <AdminLayout title="User Management">
            {/* Controls Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}
            >
                <div style={{ position: 'relative', flex: '1', maxWidth: '400px' }}>
                    <FaSearch style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94a3b8'
                    }} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            outline: 'none',
                            fontSize: '0.95rem',
                            color: '#1e293b',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1';
                            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                        }}
                    />
                </div>

                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    style={{
                        padding: '1rem 1.5rem',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        outline: 'none',
                        fontSize: '0.95rem',
                        color: '#1e293b',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                        minWidth: '150px'
                    }}
                >
                    <option value="all">All Roles</option>
                    <option value="admin">Admins Only</option>
                    <option value="user">Users Only</option>
                </select>
            </motion.div>

            {/* Users Table Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.5)'
                }}
            >
                {loading ? null : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{
                                    background: 'linear-gradient(to right, #f8fafc, #f1f5f9)',
                                    borderBottom: '1px solid #e2e8f0'
                                }}>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Joined Date</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                                            No users found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user, index) => (
                                        <motion.tr
                                            key={user._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            style={{
                                                borderBottom: '1px solid #f1f5f9',
                                                transition: 'background-color 0.2s'
                                            }}
                                            whileHover={{ backgroundColor: '#f8fafc' }}
                                        >
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '10px',
                                                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                        fontSize: '1.1rem',
                                                        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.3)'
                                                    }}>
                                                        {user.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span style={{ fontWeight: '600', color: '#1e293b' }}>{user.username}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem', color: '#64748b' }}>{user.email}</td>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <span style={{
                                                    backgroundColor: user.isAdmin ? 'rgba(99, 102, 241, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                                                    color: user.isAdmin ? '#6366f1' : '#64748b',
                                                    padding: '6px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}>
                                                    {user.isAdmin ? <FaUserShield size={12} /> : <FaUser size={12} />}
                                                    {user.isAdmin ? 'Admin' : 'User'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem', color: '#64748b' }}>
                                                {new Date(user.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                                {!user.isAdmin && (
                                                    <button
                                                        onClick={() => {
                                                            setUserToDelete(user);
                                                            setShowDeleteModal(true);
                                                        }}
                                                        style={{
                                                            background: 'white',
                                                            border: '1px solid #fee2e2',
                                                            color: '#ef4444',
                                                            cursor: 'pointer',
                                                            padding: '8px',
                                                            borderRadius: '8px',
                                                            transition: 'all 0.2s',
                                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                                        }}
                                                        onMouseOver={(e) => {
                                                            e.currentTarget.style.backgroundColor = '#ef4444';
                                                            e.currentTarget.style.color = 'white';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.currentTarget.style.backgroundColor = 'white';
                                                            e.currentTarget.style.color = '#ef4444';
                                                        }}
                                                        title="Delete User"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(15, 23, 42, 0.4)',
                            zIndex: 2000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem'
                        }}
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                padding: '2rem',
                                width: '100%',
                                maxWidth: '400px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                backgroundColor: '#fef2f2',
                                color: '#ef4444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                fontSize: '1.75rem'
                            }}>
                                <FaTrash />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
                                Delete User?
                            </h3>
                            <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: '1.5' }}>
                                Are you sure you want to remove <strong style={{ color: '#0f172a' }}>{userToDelete?.username}</strong>? This action cannot be undone.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: 'white',
                                        color: '#64748b',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        border: 'none',
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#dc2626';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = '#ef4444';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Delete User
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
};

export default AdminUsers;
