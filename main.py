from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('perspective.html')


def main():
    app.run(debug=False, port=5000)


if __name__ == "__main__":
    main()
