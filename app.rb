require 'sinatra'
require 'sinatra/reloader'
require 'securerandom'
require 'net/http'

get '/' do
    erb :index
end

post '/takePhoto' do
    # puts 
    # puts 'here'
    # puts params["value"]
    # if params[:file]

    #     uuid = SecureRandom.uuid

    #     # Dir.mkdir("archive/#{uuid}")
		
	# 	# file = File.new("archive/#{uuid}/1.jpg", "wb")

    #     # puts params[:file]

    #     # file.write(params[:file][:tempfile].read)

    #     file.close
	# 	puts "アップロード成功"
	# else
	# 	puts "アップロード失敗"
	# end

    # img_array = params[:file].split(/\s*,\s*/)

    # puts
    # puts 'here'
    # puts img_array

    # uuid = SecureRandom.uuid
    # Dir.mkdir("archive/#{uuid}")

    # file = File.new("archive/#{uuid}/1.jpg", "wb")

    # file.puts img_array[0].unpack('m')[0]

    # file.close

    uuid = SecureRandom.uuid

    Dir.mkdir("archive/#{uuid}")
		
	file = File.new("archive/#{uuid}/1.jpg", "w")

    file.write(params[:file])

    file.close

    redirect '/'
end

get '/test' do

    @image_src = File.read("archive/e0b89f8f-e848-4991-9e95-9d72c8591d5f/1.jpg")

    getFaceData

    erb :test
end

def getFaceData

    uri = URI('https://astechpuritest.cognitiveservices.azure.com/face/v1.0/detect')
    uri.query = URI.encode_www_form({
        # Request parameters
        'returnFaceId' => 'true',
        'returnFaceLandmarks' => 'false',
        'returnFaceAttributes' => 'QualityForRecognition',
        'recognitionModel' => 'recognition_04',
        'returnRecognitionModel' => 'false',
        'detectionModel' => 'detection_03',
        'faceIdTimeToLive' => '86400'
    })

    request = Net::HTTP::Post.new(uri.request_uri)
    # Request headers
    request['Content-Type'] = 'application/json'
    # Request headers
    request['Ocp-Apim-Subscription-Key'] = '1af01a9bf6a74fb991513f8ceb13b09c' #ここを変える③
    # Request body

    file_data = File.open("archive/e0b89f8f-e848-4991-9e95-9d72c8591d5f/1.jpg", "r+b")
    request.body = file_data.read
    file_data.close

    response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
        http.request(request)
    end

    puts response.body
end