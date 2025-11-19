'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChefHat, Camera, Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const steps = [
  {
    title: 'Bem-vindo ao ReceitaIA!',
    description: 'Transforme seus ingredientes em receitas incríveis com o poder da inteligência artificial.',
    icon: ChefHat,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
  },
  {
    title: 'Tire fotos dos ingredientes',
    description: 'Fotografe os ingredientes que você tem em casa. Pode tirar várias fotos para capturar tudo!',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop',
  },
  {
    title: 'IA cria sua receita',
    description: 'Nossa IA analisa os ingredientes e gera receitas personalizadas com imagem do prato e instruções completas.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push('/cadastro')
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = steps[currentStep]
  const Icon = step.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2">
          {/* Imagem */}
          <div className="relative h-64 md:h-auto">
            <img 
              src={step.image} 
              alt={step.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Conteúdo */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <ChefHat className="w-8 h-8 text-orange-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  ReceitaIA
                </span>
              </div>

              {/* Ícone do passo */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Título e descrição */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {step.title}
                </h1>
                <p className="text-lg text-gray-600">
                  {step.description}
                </p>
              </div>

              {/* Indicadores de progresso */}
              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full flex-1 transition-all ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                        : index < currentStep
                        ? 'bg-orange-300'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Botões de navegação */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>

              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                Pular
              </Link>

              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 gap-2"
              >
                {currentStep === steps.length - 1 ? 'Começar' : 'Próximo'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
