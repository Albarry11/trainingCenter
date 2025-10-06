import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Dashboard } from './Dashboard';
import { ArticlesList } from './ArticlesList';
import { ArticleEditor } from './ArticleEditor';
import { Article } from '../../types/admin';

type AdminPage = 'dashboard' | 'articles' | 'categories' | 'settings';
type ArticlesView = 'list' | 'editor';

export function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [articlesView, setArticlesView] = useState<ArticlesView>('list');
  const [editingArticle, setEditingArticle] = useState<Article | undefined>();

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setArticlesView('editor');
  };

  const handleNewArticle = () => {
    setEditingArticle(undefined);
    setArticlesView('editor');
  };

  const handleBackToList = () => {
    setEditingArticle(undefined);
    setArticlesView('list');
  };

  const handleSaveArticle = () => {
    setEditingArticle(undefined);
    setArticlesView('list');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
        
      case 'articles':
        if (articlesView === 'editor') {
          return (
            <ArticleEditor
              article={editingArticle}
              onBack={handleBackToList}
              onSave={handleSaveArticle}
            />
          );
        }
        return (
          <ArticlesList
            onEdit={handleEditArticle}
            onNew={handleNewArticle}
          />
        );
        
      case 'categories':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Categories Management</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
        
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
        
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout
      currentPage={currentPage}
      onPageChange={(page) => {
        setCurrentPage(page as AdminPage);
        // Reset articles view when changing pages
        if (page !== 'articles') {
          setArticlesView('list');
          setEditingArticle(undefined);
        }
      }}
    >
      {renderContent()}
    </AdminLayout>
  );
}