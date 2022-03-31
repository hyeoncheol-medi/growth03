from django.test import TestCase

from board.models import Article

class ArticleModelTest(TestCase):
    def test_content(self):
        content = 'test_content'
        test_article = Article(content=content)
        test_article.save()
        
        result_article = Article.objects.filter(id=test_article.id).last()
        self.assertEqual(result_article.content, content)
        