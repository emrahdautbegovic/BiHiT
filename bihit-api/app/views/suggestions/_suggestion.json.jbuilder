json.extract! suggestion, :id, :title, :date_created, :user_id, :created_at, :updated_at, :email
json.url suggestion_url(suggestion, format: :json)
