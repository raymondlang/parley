# Load the Rails application.
require_relative "application"

Jbuilder.key_format camelize: :lower
Jbuilder.deep_format_keys true

Rails.application.initialize!
