import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repos, setRepos] = useState<Repository[]>(() => {
    const storagedRepos = localStorage.getItem('@GithubExplorer:repositories');

    if (storagedRepos) {
      return JSON.parse(storagedRepos);
    }

    return [];
  });
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repos));
  }, [repos]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Type the author/repository name');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepos([...repos, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Error to find this repository');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore Github Repositories</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Search for repository name"
        />
        <button type="submit">Search</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repos.map((repository) => (
          <Link
            key={repository.full_name}
            to={`repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20}> </FiChevronRight>
          </Link>
        ))}
      </Repositories>
    </>
  );
};
export default Dashboard;
