
import { Link } from 'react-router-dom';
import { Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/UI/ButtonCustom';
import Card from '@/components/UI/CardCustom';
import { useRef } from 'react';

function TargetUser() {
  const targetAudienceRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={targetAudienceRef} className="py-20 relative bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-reveal text-3xl lg:text-4xl font-bold text-white mb-4">
              Target Users
            </h2>
            <p className="text-reveal text-xl text-white/60 max-w-2xl mx-auto">
              A platform designed for various roles within the product authentication ecosystem.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="audience-card hover-card">
              <Card hover className="text-center h-full">
                <Shield className="card-icon h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Brands / MSMEs</h3>
                <p className="text-white/70 mb-6">
                  Businesses seeking to protect their products from counterfeiting and provide authenticity assurance to customers.
                </p>
                <Link to="/brand" className="interactive-button">
                  <Button  id="brand-button" variant="primary" size="sm" className="group">
                    Get Started
                    <ArrowRight className="button-icon w-4 h-4 ml-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            </div>

            <div className="audience-card hover-card">
              <Card hover className="text-center h-full">
                <Users className="card-icon h-16 w-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Buyers / Consumers & Collectors</h3>
                <p className="text-white/70 mb-6">
                  Consumers who want to verify the authenticity of purchased products, and collectors who value genuine items.
                </p>
                <Link to="/buyer" className="interactive-button">
                  <Button id="buyer-button" variant="accent" size="sm" className="group">
                    Verify Product
                    <ArrowRight className="button-icon w-4 h-4 ml-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            </div>

            <div className="audience-card hover-card">
              <Card hover className="text-center h-full">
                <CheckCircle className="card-icon h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Administrators</h3>
                <p className="text-white/70 mb-6">
                  Platform managers responsible for overseeing operations, validating brands, analitycs, and maintaining ecosystem security.
                </p>
                <Link to="/admin" className="interactive-button">
                  <Button id="admin-button" variant="secondary" size="sm" className="group">
                    Admin Panel
                    <ArrowRight className="button-icon w-4 h-4 ml-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>
  )
}

export default TargetUser