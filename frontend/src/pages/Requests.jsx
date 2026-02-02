import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestsAPI } from '../services/api';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async (searchQuery = '') => {
    try {
      setLoading(true);
      const params = searchQuery ? { search: searchQuery } : {};
      const response = await requestsAPI.getAll(params);
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRequests(search);
  };

  if (loading) {
    return <div style={styles.loading}>로딩 중...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>의뢰 목록</h1>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="의뢰 검색..."
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>검색</button>
        </form>
      </div>

      {requests.length === 0 ? (
        <p style={styles.empty}>등록된 의뢰가 없습니다.</p>
      ) : (
        <div style={styles.list}>
          {requests.map((request) => (
            <Link
              key={request.id}
              to={`/requests/${request.id}`}
              style={styles.card}
            >
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{request.title}</h3>
                <span style={styles.date}>
                  {new Date(request.created_at).toLocaleDateString()}
                </span>
              </div>
              <p style={styles.cardDesc}>
                {request.description.substring(0, 200)}
                {request.description.length > 200 ? '...' : ''}
              </p>
              <div style={styles.cardFooter}>
                <div style={styles.cardTags}>
                  {request.tags?.map((tag) => (
                    <span key={tag.id} style={styles.tag}>{tag.name}</span>
                  ))}
                </div>
                {request.budget && (
                  <span style={styles.budget}>예산: {request.budget}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '4rem',
    fontSize: '1.2rem',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#2c3e50',
  },
  searchForm: {
    display: 'flex',
    gap: '1rem',
    maxWidth: '500px',
  },
  searchInput: {
    flex: 1,
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  searchButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem',
    color: '#7f8c8d',
    fontSize: '1.1rem',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textDecoration: 'none',
    color: 'inherit',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
  },
  cardTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    fontWeight: 'bold',
    margin: 0,
  },
  date: {
    color: '#95a5a6',
    fontSize: '0.9rem',
  },
  cardDesc: {
    color: '#7f8c8d',
    marginBottom: '1rem',
    lineHeight: '1.6',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  cardTags: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e8f4f8',
    color: '#3498db',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
  },
  budget: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
};

export default Requests;
