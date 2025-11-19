'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChefHat, Camera, BookOpen, Crown, Settings, LogOut, Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getProfile, getUserSubscription, signOut } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/login')
        return
      }

      setUser(currentUser)

      const [profileData, subscriptionData] = await Promise.all([
        getProfile(currentUser.id),
        getUserSubscription(currentUser.id),
      ])

      setProfile(profileData)
      setSubscription(subscriptionData)

      // Carregar receitas recentes
      const { data: recipesData } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })
        .limit(6)

      setRecipes(recipesData || [])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Logout realizado com sucesso')
      router.push('/')
    } catch (error) {
      toast.error('Erro ao fazer logout')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-orange-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              ReceitaIA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/perfil">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Olá, {profile?.full_name || 'Chef'}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Pronto para criar receitas incríveis hoje?
          </p>
        </div>

        {/* Status da assinatura */}
        <Card className="mb-8 border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Plano {subscription?.plan?.name || 'Gratuito'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {subscription?.recipes_used_this_month || 0} de{' '}
                    {subscription?.plan?.max_recipes_per_month === -1 
                      ? '∞' 
                      : subscription?.plan?.max_recipes_per_month || 5
                    } receitas este mês
                  </p>
                </div>
              </div>
              {subscription?.plan?.name === 'Gratuito' && (
                <Link href="/planos">
                  <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                    Fazer Upgrade
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ações rápidas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/receitas/nova">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-orange-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Nova Receita</h3>
                    <p className="text-gray-600">Tire fotos dos ingredientes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/receitas">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Minhas Receitas</h3>
                    <p className="text-gray-600">Ver todas as receitas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Receitas recentes */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Receitas Recentes</h2>
            <Link href="/receitas">
              <Button variant="ghost">Ver todas</Button>
            </Link>
          </div>

          {recipes.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhuma receita ainda</h3>
                <p className="text-gray-600 mb-6">
                  Comece tirando fotos dos seus ingredientes!
                </p>
                <Link href="/receitas/nova">
                  <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                    <Plus className="w-5 h-5 mr-2" />
                    Criar primeira receita
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Link key={recipe.id} href={`/receitas/${recipe.id}`}>
                  <Card className="hover:shadow-xl transition-shadow cursor-pointer overflow-hidden">
                    {recipe.dish_image_url && (
                      <img
                        src={recipe.dish_image_url}
                        alt={recipe.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2">{recipe.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                        {recipe.prep_time && (
                          <span>⏱️ {recipe.prep_time} min</span>
                        )}
                        {recipe.difficulty && (
                          <span className="capitalize">• {recipe.difficulty}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
