'use client'

import { Button } from '@/components/ui/button'
import { ChefHat, Camera, Sparkles, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
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
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/cadastro">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Powered by IA
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Transforme seus{' '}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              ingredientes
            </span>
            {' '}em receitas incríveis
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tire uma foto dos ingredientes que você tem em casa e nossa IA cria receitas personalizadas, 
            rápidas e práticas em segundos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/cadastro">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-lg px-8 py-6">
                <Camera className="w-5 h-5 mr-2" />
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Ver Como Funciona
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="container mx-auto px-4 py-20 bg-white rounded-3xl shadow-xl">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Como funciona?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">1. Tire uma foto</h3>
              <p className="text-gray-600">
                Fotografe os ingredientes que você tem disponíveis em casa
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">2. IA analisa</h3>
              <p className="text-gray-600">
                Nossa inteligência artificial identifica os ingredientes e cria receitas
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">3. Cozinhe!</h3>
              <p className="text-gray-600">
                Receba receitas completas com foto do prato e passo a passo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Por que escolher ReceitaIA?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              'Receitas personalizadas para seus ingredientes',
              'Imagens realistas dos pratos gerados por IA',
              'Economize tempo e dinheiro',
              'Reduza desperdício de alimentos',
              'Descubra novas combinações',
              'Receitas para todos os níveis',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Crie sua conta gratuitamente e gere suas primeiras receitas hoje mesmo
          </p>
          <Link href="/cadastro">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6">
              Criar Conta Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 ReceitaIA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
